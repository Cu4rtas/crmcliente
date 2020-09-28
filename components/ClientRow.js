import React from 'react';
import Router from 'next/router';
const ClientRow = ({ cliente }) => {
	const { documento, nombre, apellido, telefono, ciudad, direccion, email } = cliente;

	const goToEditClient = () => {
		Router.push({
			pathname: `/editarcliente/${documento}`
		});
	};

	return (
		<tr>
			<td className="px-6 py-4 whitespace-no-wrap">
				<div className="flex items-center">
					<div>
						<div className="text-sm leading-5 font-medium text-gray-900">
							{nombre} {apellido}
						</div>
						<div className="text-sm leading-5 text-gray-500">{email}</div>
					</div>
				</div>
			</td>
			<td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-800">{documento}</td>
			<td className="px-6 py-4 whitespace-no-wrap">
				<div className="text-sm leading-5 text-gray-900">{direccion}</div>
				<div className="text-sm leading-5 text-gray-600">{ciudad}</div>
			</td>
			<td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-800">{telefono}</td>
			<td className="px-4 py-4 text-right text-sm leading-5 font-medium">
				<button
					className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded pl-3 pr-2"
					onClick={() => goToEditClient()}
				>
					EDITAR
					<svg
						className="w-4 h-4 ml-1 mb-1 inline-block"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
						/>
					</svg>
				</button>
			</td>
		</tr>
	);
};

export default ClientRow;
