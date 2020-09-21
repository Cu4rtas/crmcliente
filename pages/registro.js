import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const REGISTRO_USUARIO = gql`
	mutation crearUsuario($input: UsuarioInput) {
		crearUsuario(input: $input) {
			id
			email
			nombre
			apellido
		}
	}
`;

const Registro = () => {
	const [ crearUsuario ] = useMutation(REGISTRO_USUARIO);
	const [ msg, saveMessage ] = useState(null);
	const [ color, changeColor ] = useState('');
	const router = useRouter();
	// Validación del formulario
	const formik = useFormik({
		initialValues: {
			nombre: '',
			apellido: '',
			email: '',
			password: ''
		},
		onSubmit: async (values) => {
			const { nombre, apellido, email, password } = values;
			try {
				const { data } = await crearUsuario({
					variables: {
						input: {
							nombre,
							apellido,
							email,
							password
						}
					}
				});
				formik.resetForm();
				changeColor('green');
				saveMessage(`Usuario "${data.crearUsuario.email}" creado exitosamente.`);
				setTimeout(() => {
					saveMessage(null);
					router.push('/');
				}, 3000);
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
		<div>
			<Layout>
				<h1 className="text-center text-2xl text-white">Registro</h1>
				{msg && showMessage()}
				<div className="flex justify-center mt-5">
					<div className="w-full max-w-sm">
						<form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
									Nombre
								</label>
								<input
									value={formik.values.nombre}
									onChange={formik.handleChange}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="nombre"
									type="text"
									required={true}
									placeholder="Ingrese nombre..."
								/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
									Apellido
								</label>
								<input
									value={formik.values.apellido}
									onChange={formik.handleChange}
									required={true}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="apellido"
									type="text"
									placeholder="Ingrese apellido..."
								/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
									Email
								</label>
								<input
									value={formik.values.email}
									onChange={formik.handleChange}
									required={true}
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
									value={formik.values.password}
									onChange={formik.handleChange}
									required={true}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="password"
									type="password"
									placeholder="Ingrese contraseña..."
									minLength={6}
								/>
							</div>
							<input
								type="submit"
								className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 rounded"
								value="Registrar Usuario"
							/>
						</form>
					</div>
				</div>
			</Layout>
		</div>
	);
};

export default Registro;
