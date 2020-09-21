import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const AUTENTICAR = gql`
	mutation autenticarUsuario($input: AutenticarInput) {
		autenticarUsuario(input: $input) {
			token
		}
	}
`;

const Login = () => {
	const [ autenticarUsuario ] = useMutation(AUTENTICAR);
	const [ msg, saveMessage ] = useState(null);
	const [ color, changeColor ] = useState('');
	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: async (values) => {
			const { email, password } = values;
			try {
				const { data } = await autenticarUsuario({
					variables: {
						input: {
							email,
							password
						}
					}
				});
				changeColor('green');
				saveMessage(`Autenticando...`);

				const { token } = data.autenticarUsuario;
				localStorage.setItem('token', token);

				setTimeout(() => {
					saveMessage(null);
					router.push('/');
				}, 2000);
			} catch (error) {
				changeColor('red');
				saveMessage(error.message.replace('GraphQL error:', ''));
				setTimeout(() => {
					saveMessage(null);
				}, 5000);
			}
		}
	});

	const showMessage = () => {
		return (
			<div
				className={`bg-${color}-600 text-white py-2 px-3 my-3 w-full max-w-sm text-center mx-auto font-bold rounded`}
			>
				<p>{msg}</p>
			</div>
		);
	};

	return (
		<Layout>
			<div className="text-center text-2xl text-white">Login</div>
			{msg && showMessage()}
			<div className="flex justify-center mt-5">
				<div className="w-full max-w-sm">
					<form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
						<div className="mb-4">
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
								required={true}
								value={formik.values.password}
								onChange={formik.handleChange}
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
