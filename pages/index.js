import Layout from '../components/Layout';
import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
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

const Index = () => {
	const router = useRouter();
	const { data, loading, client } = useQuery(OBTENER_CLIENTES_USUARIO);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (!data.obtenerClientesVendedor) {
		client.clearStore();
		router.push('/login');
		return <p>Loading...</p>;
	}

	return (
		<Layout>
			<h1>Clientes</h1>
			<Link href="/registrocliente">
				<a className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
					REGISTRAR CLIENTE
				</a>
			</Link>
			<hr className="border bg-black  mt-6" />
			<div className="flex flex-col mt-4">
				<div className="-my-2 overflow-x-auto sm:-mx-4 lg:-mx-4">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-800">
									<tr className="text-white">
										<th className="px-4 py-3  text-left text-xs leading-4 font-medium  uppercase ">
											Nombre
										</th>
										<th className="px-2 py-3  text-left text-xs leading-4 font-medium  uppercase ">
											Documento
										</th>
										<th className="px-4 py-3  text-left text-xs leading-4 font-medium  uppercase ">
											Ubicación
										</th>
										<th className="px-4 py-3  text-left text-xs leading-4 font-medium  uppercase ">
											Móvil
										</th>
										<th className="px-4 py-3 " />
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{data.obtenerClientesVendedor.map((cliente) => (
										<tr key={cliente.documento}>
											<td className="px-6 py-4 whitespace-no-wrap">
												<div className="flex items-center">
													<div>
														<div className="text-sm leading-5 font-medium text-gray-900">
															{cliente.nombre} {cliente.apellido}
														</div>
														<div className="text-sm leading-5 text-gray-500">
															{cliente.email}
														</div>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
												{cliente.documento}
											</td>
											<td className="px-6 py-4 whitespace-no-wrap">
												<div className="text-sm leading-5 text-gray-900">
													{cliente.direccion}
												</div>
												<div className="text-sm leading-5 text-gray-500">{cliente.ciudad}</div>
											</td>
											<td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
												{cliente.movil}
											</td>
											<td className="px-4 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
												<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
													Editar
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Index;
