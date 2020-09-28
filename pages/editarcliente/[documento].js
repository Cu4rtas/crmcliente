import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Swal from 'sweetalert2';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Formik } from 'formik';

const EDITAR_CLIENTE = gql`
	mutation editarCliente($input: ClienteInput) {
		editarCliente(input: $input) {
			documento
			nombre
			apellido
			telefono
			email
			ciudad
			direccion
		}
	}
`;

const OBTENER_CLIENTE = gql`
	query obtenerCliente($documento: ID!) {
		obtenerCliente(documento: $documento) {
			documento
			nombre
			apellido
			telefono
			email
			ciudad
			direccion
		}
	}
`;

const ELIMINAR_CLIENTE = gql`
	mutation eliminarCliente($documento: ID!) {
		eliminarCliente(documento: $documento)
	}
`;

const OBTENER_CLIENTES_USUARIO = gql`
	query obtenerClientesVendedor {
		obtenerClientesVendedor {
			documento
			nombre
			apellido
			ciudad
			email
			telefono
			direccion
		}
	}
`;

const EditarCliente = () => {
	const router = useRouter();
	const queryDocument = router.query.documento;

	const { loading, data, error } = useQuery(OBTENER_CLIENTE, { variables: { documento: queryDocument } });
	const [ editarCliente ] = useMutation(EDITAR_CLIENTE, {
		update(cache, { data: editarCliente }) {
			// Actulizar Clientes
			const { obtenerClientesVendedor } = cache.readQuery({
				query: OBTENER_CLIENTES_USUARIO
			});

			const clientesActualizados = obtenerClientesVendedor.map(
				(cliente) => (cliente.documento === queryDocument ? editarCliente : cliente)
			);

			cache.writeQuery({
				query: OBTENER_CLIENTES_USUARIO,
				data: {
					obtenerClientesVendedor: clientesActualizados
				}
			});

			// Actulizar Cliente Actual
			cache.writeQuery({
				query: OBTENER_CLIENTE,
				variables: { documento: queryDocument },
				data: {
					obtenerCliente: editarCliente
				}
			});
		}
	});
	const [ eliminarCliente ] = useMutation(ELIMINAR_CLIENTE, {
		update(cache) {
			const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO });
			cache.writeQuery({
				query: OBTENER_CLIENTES_USUARIO,
				data: {
					obtenerClientesVendedor: obtenerClientesVendedor.filter((c) => c.documento !== queryDocument)
				}
			});
		}
	});

	if (loading) {
		return <p>Cargando ...</p>;
	}
	if (error) {
		return <p>Error: {error}</p>;
	}

	const { obtenerCliente } = data;

	const editClient = async (values) => {
		const { documento, nombre, apellido, telefono, email, ciudad, direccion } = values;
		Swal.fire({
			title: '¿Quíere guardar los cambios?',
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: `Si`,
			denyButtonText: `No`,
			cancelButtonText: 'Cancelar',
			icon: 'question'
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await editarCliente({
						variables: {
							input: {
								oldDoc: queryDocument,
								documento,
								nombre,
								apellido,
								telefono,
								email,
								ciudad,
								direccion
							}
						}
					});
				} catch (error) {
					console.log(error);
				}

				Swal.fire('¡Éxito!', 'Se guardaron los cambios exitosamente.', 'success');
				router.push('/');
			} else if (result.isDenied) {
				Swal.fire('No se guardaron los cambios', '', 'info');
				router.push('/');
			}
		});
	};

	const deleteClient = async () => {
		Swal.fire({
			title: '¿Está seguro que quiere elimnar este cliente?',
			text: '¡Esta acción no se puede deshacer!.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, continuar.',
			cancelButtonText: 'No, cancelar.'
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					const { data } = await eliminarCliente({ variables: { documento: queryDocument } });
					Swal.fire('¡Eliminado!', data.eliminarCliente, 'success');
					router.push('/');
				} catch (error) {
					console.log(error);
				}
			}
		});
	};

	return (
		<Layout>
			<h1>Desde editar</h1>
			<div className="flex justify-center mt-5">
				<div className="w-full ">
					<Formik enableReinitialize initialValues={obtenerCliente} onSubmit={editClient}>
						{(props) => {
							return (
								<form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={props.handleSubmit}>
									<div>
										<label
											className="block text-gray-700 text-sm font-bold mb-2"
											htmlFor="documento"
										>
											Documento
										</label>
										<input
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											id="documento"
											type="text"
											required={true}
											value={props.values.documento}
											onChange={props.handleChange}
											placeholder="Documento..."
										/>
									</div>
									<div>
										<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
											Nombre
										</label>
										<input
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											id="nombre"
											type="text"
											required={true}
											value={props.values.nombre}
											onChange={props.handleChange}
											placeholder="Nombre..."
										/>
									</div>
									<div>
										<label
											className="block text-gray-700 text-sm font-bold mb-2"
											htmlFor="apellido"
										>
											Apellido
										</label>
										<input
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											id="apellido"
											type="text"
											required={true}
											value={props.values.apellido}
											onChange={props.handleChange}
											placeholder="Apellido..."
										/>
									</div>
									<div>
										<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
											Email
										</label>
										<input
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											id="email"
											type="email"
											required={true}
											value={props.values.email}
											onChange={props.handleChange}
											placeholder="Email..."
										/>
									</div>
									<div>
										<label
											className="block text-gray-700 text-sm font-bold mb-2"
											htmlFor="telefono"
										>
											Teléfono
										</label>
										<input
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											id="telefono"
											type="tel"
											required={true}
											value={props.values.telefono}
											onChange={props.handleChange}
											placeholder="Teléfono..."
										/>
									</div>
									<div className="md:flex">
										<div className="flex-auto mb-5 md:mb-0">
											<label
												className="block text-gray-700 text-sm font-bold mb-2"
												htmlFor="ciudad"
											>
												Ciudad
											</label>
											<input
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
												id="ciudad"
												type="text"
												required={true}
												value={props.values.ciudad}
												onChange={props.handleChange}
												placeholder="Ciudad..."
											/>
										</div>
										<div className="flex-auto md:ml-2 md:mb-0">
											<label
												className="block text-gray-700 text-sm font-bold mb-2"
												htmlFor="direccion"
											>
												Dirección
											</label>
											<input
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
												id="direccion"
												type="text"
												required={true}
												value={props.values.direccion}
												onChange={props.handleChange}
												placeholder="Dirección..."
											/>
										</div>
									</div>
									<div className="flex justify-center">
										<button
											type="submit"
											className="bg-green-600 mt-5 p-2 text-white cursor-pointer font-medium uppercase hover:bg-gray-900 rounded flex-auto"
											value=" guardar cambios"
										>
											&#x02713; Guardar Cambios
										</button>
										<button
											type="button"
											className="bg-red-600 mt-5 p-2 text-white cursor-pointer font-medium uppercase hover:bg-gray-900 rounded flex-auto ml-2"
											onClick={deleteClient}
										>
											&#x02717; Eliminar
										</button>
									</div>
								</form>
							);
						}}
					</Formik>
				</div>
			</div>
		</Layout>
	);
};

export default EditarCliente;
