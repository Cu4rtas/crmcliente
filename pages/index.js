import React from 'react';
import Layout from '../components/Layout';
import ClientRow from '../components/ClientRow';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
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
											Teléfono
										</th>
										<th className="px-4 py-3 " />
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{data.obtenerClientesVendedor.map((cliente) => (
										<ClientRow key={cliente.documento} cliente={cliente} />
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
