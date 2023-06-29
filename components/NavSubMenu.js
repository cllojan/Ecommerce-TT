import React from 'react'
import Link from "next/link";
import { useRouter } from "next/router";

const NavSubMenu = ({route,isOpen, subItems}) => {
    const inactiveLink = 'flex items-center gap-2 rounded-lg  px-4 py-2 text-sm font-medium text-gray-500';
  const activeLink = 'flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500';
    const router = useRouter();
    const { pathname } = router;
  return (
    <details className="group [&_summary::-webkit-details-marker]:hidden" open={isOpen}>
              <summary
                className="group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <div className="flex items-center gap-2">
                <svg className="h-5 w-5 opacity-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
</svg>


                  <span className="text-sm font-medium"> Productos </span>
                </div>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                <li>
                  <Link
                    href={"/products/agregar"}
                    className={pathname.includes("/products/agregar")?activeLink:inactiveLink}
                  >
                    Agregar Productos
                  </Link>
                </li>

                <li>
                  <Link
                    href={"/productos"}
                    className={pathname.includes("/productos")?activeLink:inactiveLink}
                  >
                    Lista productos
                  </Link>
                </li>
              </ul>
            </details>
  )
}

export default NavSubMenu