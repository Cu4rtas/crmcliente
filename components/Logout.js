import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const OBTENER_USUARIO = gql`
	query obtenerUsuario {
		obtenerUsuario {
			id
			nombre
			apellido
			email
		}
	}
`;

const Logout = () => {
	const router = useRouter();
	const { data, loading, client } = useQuery(OBTENER_USUARIO);

	if (loading) {
		return <p>Loading...</p>;
	}

	const logout = () => {
		localStorage.removeItem('token');
		client.clearStore();
		router.push('/login');
	};

	return (
		<div className="flex items-center bg-gray-600 p-2 shadow-xl">
			<div className="flex-shrink-0 h-10 w-10">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>
			<div className="ml-4">
				<div className="text-xl leading-6  text-black">
					Hola<i className="font-medium">{` ${data.obtenerUsuario.nombre} ${data.obtenerUsuario
						.apellido}`}</i>
				</div>
				<div
					className="hover:underline cursor-pointer leading-6 font-medium text-white"
					onClick={() => logout()}
				>
					Cerrar Sesión
				</div>
			</div>
		</div>
	);
};

export default Logout;
