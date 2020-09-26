import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const CREAR_CLIENTE = gql`
	mutation crearCliente($input: ClienteInput) {
		crearCliente(input: $input) {
			documento
			nombre
			apellido
		}
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

const RegistroCliente = () => {
	const router = useRouter();

	const [ msg, saveMessage ] = useState(null);

	const [ crearCliente ] = useMutation(CREAR_CLIENTE, {
		update(cache, { data: { crearCliente } }) {
			const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO });

			cache.writeQuery({
				query: OBTENER_CLIENTES_USUARIO,
				data: {
					obtenerClientesVendedor: [ ...obtenerClientesVendedor, crearCliente ]
				}
			});
		}
	});

	const formik = useFormik({
		initialValues: {
			documento: '',
			nombre: '',
			apellido: '',
			telefono: '',
			ciudad: '',
			direccion: '',
			email: ''
		},
		onSubmit: async (values) => {
			const { documento, nombre, apellido, telefono, ciudad, direccion, email } = values;
			try {
				const { data } = await crearCliente({
					variables: {
						input: {
							documento,
							nombre,
							apellido,
							telefono,
							ciudad,
							direccion,
							email
						}
					}
				});
				router.push('/');
			} catch (error) {
				saveMessage(error.message.replace('GraphQL error:', ''));
				setTimeout(() => {
					saveMessage(null);
				}, 3000);
			}
		}
	});

	const showMessage = () => {
		return (
			<div className={`bg-red-600 text-white py-2 px-3 my-3 w-full text-center mx-auto font-bold rounded`}>
				<p>&times; {msg}</p>
			</div>
		);
	};

	return (
		<Layout>
			<h1>Nuevo Cliente</h1>
			{msg && showMessage()}
			<div className="flex justify-center mt-5">
				<div className="w-full ">
					<form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
						<div>
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="documento">
								Documento
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="documento"
								type="text"
								required={true}
								value={formik.values.documento}
								onChange={formik.handleChange}
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
								value={formik.values.nombre}
								onChange={formik.handleChange}
								placeholder="Nombre..."
							/>
						</div>
						<div>
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
								Apellido
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="apellido"
								type="text"
								required={true}
								value={formik.values.apellido}
								onChange={formik.handleChange}
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
								value={formik.values.email}
								onChange={formik.handleChange}
								placeholder="Email..."
							/>
						</div>
						<div>
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
								Teléfono
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="telefono"
								type="tel"
								required={true}
								value={formik.values.telefono}
								onChange={formik.handleChange}
								placeholder="Teléfono..."
							/>
						</div>
						<div className="md:flex">
							<div className="flex-auto mb-5 md:mb-0">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ciudad">
									Ciudad
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="ciudad"
									type="text"
									required={true}
									value={formik.values.ciudad}
									onChange={formik.handleChange}
									placeholder="Ciudad..."
								/>
							</div>
							<div className="flex-auto md:ml-2 md:mb-0">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="direccion">
									Dirección
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="direccion"
									type="text"
									required={true}
									value={formik.values.direccion}
									onChange={formik.handleChange}
									placeholder="Dirección..."
								/>
							</div>
						</div>

						<input
							type="submit"
							className="bg-green-600 w-full mt-5 p-2 text-white cursor-pointer font-medium uppercase hover:bg-gray-900 rounded"
							value="Registrar Cliente"
						/>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default RegistroCliente;
