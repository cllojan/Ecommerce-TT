import Link from "next/link";
import {useRouter} from "next/router";
import {signOut} from "next-auth/react";
import Logo from "@/components/Logo";

export default function Nav({show}) {
  const inactiveLink = 'block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700';
  const activeLink = 'block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700';
  const inactiveIcon = 'w-6 h-6';
  const activeIcon = inactiveIcon + ' text-primary';
  const router = useRouter();
  const {pathname} = router;
  async function logout() {
    await router.push('/');
    await signOut();
  }
  return (
    <div className="flex h-screen flex-col justify-between border-e bg-white">
  <div className="px-4 py-6">
    <span
      className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600"
    >
      <Logo />
    </span>

    <ul className="mt-6 space-y-1">
      <li>
        <Link
          href={"/"}
          className={pathname === "/" ? activeLink : inactiveLink}
        >
          Inicio
        </Link>
      </li>
      <li>
        <Link
          href={"/products"}
          className={pathname.includes('/products') ? activeLink : inactiveLink}
        >
          Productos
        </Link>
      </li>
      <li>
        <Link
          href={"/categories"}
          className={pathname.includes('/categories') ? activeLink : inactiveLink}
        >
          Categorias
        </Link>
      </li>
      <li>
        <Link
          href={"/orders"}
          className={pathname.includes('/orders') ? activeLink : inactiveLink}
        >
          Ordenes
        </Link>
      </li>
     
    </ul>
  </div>

  <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
      <button onClick={logout} className={inactiveLink + " flex gap-1 w-full"}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Logout
        </button>
  </div>
</div>
   
  );
}