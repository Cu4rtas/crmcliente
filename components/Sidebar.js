import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logout from './Logout';
const Sidebar = () => {
	const router = useRouter();
	return (
		<aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-0">
			<div>
				<p className="text-white text-2xl font-bold ml-2 my-5">CRM Clientes</p>
			</div>
			<Logout />
			<nav className="my-5">
				<ul className="list-none mx-4">
					<li className={router.pathname == '/' ? 'bg-blue-800 p-2 shadow-md' : 'p-2'}>
						<Link href="/">
							<a className="text-white block">Clientes</a>
						</Link>
					</li>
					<li className={router.pathname == '/pedidos' ? 'bg-blue-800 p-2 shadow-md' : 'p-2'}>
						<Link href="/pedidos">
							<a className="text-white block">Pedidos</a>
						</Link>
					</li>
					<li className={router.pathname == '/productos' ? 'bg-blue-800 p-2 shadow-md' : 'p-2'}>
						<Link href="/productos">
							<a className="text-white block">Productos</a>
						</Link>
					</li>
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;
