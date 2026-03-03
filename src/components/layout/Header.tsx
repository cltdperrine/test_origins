import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Header() {
    const location = useLocation();

    const navigation = [
        { name: "Accueil", path: "/" },
        { name: "Articles", path: "/articles" },
        { name: "Vidéos", path: "/videos" },
    ];

    return (
        <Disclosure as="nav" className="bg-white shadow-sm sticky top-0 z-50">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="flex h-16 items-center justify-between">

                            {/* Logo */}
                            <div className="flex items-center">
                                <Link
                                    to="/"
                                    className="text-lg font-semibold text-gray-900 tracking-tight"
                                >
                                    tech-test | Origins Digital
                                </Link>
                            </div>

                            {/* Desktop navigation */}
                            <div className="hidden sm:flex space-x-6">
                                {navigation.map((item) => {
                                    const isActive = location.pathname === item.path;

                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            className={classNames(
                                                isActive
                                                    ? "text-gray-900 border-b-2 border-gray-900"
                                                    : "text-gray-500 hover:text-gray-900",
                                                "text-sm font-medium transition pb-1"
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Mobile button */}
                            <div className="sm:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-gray-900">
                                    {open ? (
                                        <XMarkIcon className="size-6" />
                                    ) : (
                                        <Bars3Icon className="size-6" />
                                    )}
                                </Disclosure.Button>
                            </div>

                        </div>
                    </div>

                    {/* Mobile menu */}
                    <Disclosure.Panel className="sm:hidden px-6 pb-4">
                        {navigation.map((item) => (
                            <Disclosure.Button
                                key={item.name}
                                as={Link}
                                to={item.path}
                                className="block py-2 text-gray-600 hover:text-gray-900"
                            >
                                {item.name}
                            </Disclosure.Button>
                        ))}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}