import React from 'react';
import Layout from '../components/Layout';
const Login = () => {
	return (
		<Layout>
			<div className="text-center text-2xl text-white">Login</div>

			<div className="flex justify-center mt-5">
				<div className="w-full max-w-sm">
					<form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
								Email
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="email"
								type="email"
								placeholder="Ingrese email..."
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
								Contraseña
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="password"
								type="password"
								placeholder="Ingrese contraseña..."
							/>
						</div>
						<input
							type="submit"
							className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 rounded"
							value="Iniciar Sesión"
						/>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default Login;
