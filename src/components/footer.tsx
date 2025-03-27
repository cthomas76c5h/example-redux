import { SharedData } from '../types';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

export default function Footer() {
    const name = useSelector((state: SharedData) => state.name);

    return (
        <footer className="bg-gradient-to-b from-blue-600 to-blue-900 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">{name}</h3>
                        <p className="text-sm text-gray-300">Become part of Example Domain</p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Quick access</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    to="/"
                                    className="border-b border-transparent text-blue-200 transition-colors duration-200 hover:border-white hover:text-white"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/votes"
                                    className="border-b border-transparent text-blue-200 transition-colors duration-200 hover:border-white hover:text-white"
                                >
                                    All votes
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="border-b border-transparent text-blue-200 transition-colors duration-200 hover:border-white hover:text-white"
                                >
                                    About us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    className="border-b border-transparent text-blue-200 transition-colors duration-200 hover:border-white hover:text-white"
                                >
                                    Website of Example Domain
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://vite.dev/guide"
                                    target="_blank"
                                    className="border-b border-transparent text-blue-200 transition-colors duration-200 hover:border-white hover:text-white"
                                >
                                    Getting Started with Vite
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/abstimmung-eu/abstimmung.eu"
                                    target="_blank"
                                    className="border-b border-transparent text-blue-200 transition-colors duration-200 hover:border-white hover:text-white"
                                >
                                    GitHub Repository
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/rss.index"
                                    target="_blank"
                                    className="border-b border-transparent text-blue-200 transition-colors duration-200 hover:border-white hover:text-white"
                                >
                                    RSS Feed
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Contact</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="text-gray-300">info@example.com</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t border-blue-600 pt-8 text-sm text-gray-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <p>
                                © {new Date().getFullYear()} {name}. All Rights Reserved.
                            </p>
                            <p className="mt-2">This Website is not affiliated with Example Domain.</p>
                        </div>
                        <div className="mt-4 space-x-4 md:mt-0">
                            <Link
                                to="/contact"
                                className="border-b border-transparent text-blue-200 transition-colors duration-200 hover:border-white hover:text-white"
                            >
                                Contact
                            </Link>
                            <Link
                                to="/privacy"
                                className="border-b border-transparent text-blue-200 transition-colors duration-200 hover:border-white hover:text-white"
                            >
                                Privacy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
