"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import axios from "axios";
import { Contact, ContactData } from "./Interfaces/Contact";
import { NewContactForm } from "./Components/Form";
import { getLifeCycleLabel } from "./Utils/Utils";
axios.defaults.headers.common["accept"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Token"] =
  process.env.NEXT_PUBLIC_API_TOKEN;

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openContact, setOpenContact] = useState<Contact | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [updateContacts, setUpdateContacts] = useState(false);
  const contactsPerPage = 5;

  const filteredContacts =
    contacts.length > 0 &&
    contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === 1 || contact.life_cycle === categoryFilter)
    );

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts =
    filteredContacts &&
    filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages =
    filteredContacts && filteredContacts.length > 0
      ? Math.ceil(filteredContacts.length / contactsPerPage)
      : 1;

  useEffect(() => {
    loadContacts().then((contacts: ContactData) =>
      setContacts(contacts.results)
    );
  }, [updateContacts]);

  const handleModal = () => {
    if (isModalOpen) {
      setOpenContact(null);
    }
    setIsModalOpen(!isModalOpen);
  };

  const loadContacts = async () => {
    const contacts: ContactData = await axios
      .get("/api/contacts?page_size=15&sort_order=asc&filter=")
      .then((response) => response.data);
    setUpdateContacts(false);
    return contacts;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Contatos</h1>
        <button
          onClick={handleModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" /> Adicionar Contato
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar contatos por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-2 py-2 border rounded-md"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(parseInt(e.target.value, 10))}
          className="border rounded-md px-2 py-2"
        >
          <option value={1}>Nenhum</option>
          <option value={2}>Assinante</option>
          <option value={3}>Em nutrição</option>
          <option value={4}>Em qualificação</option>
          <option value={5}>Qualificado</option>
          <option value={6}>Descartado</option>
          <option value={7}>Qualificado com sucesso</option>
          <option value={8}>Qualificado sem sucesso</option>
          <option value={9}>Negociação</option>
          <option value={10}>Cliente</option>
          <option value={11}>Perdido</option>
          <option value={12}>Inativo</option>
        </select>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nome</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Telefone</th>
            <th className="py-3 px-6 text-left">Categoria</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {currentContacts &&
            currentContacts.map((contact) => (
              <tr
                key={contact.id}
                className="border-b border-gray-200 hover:bg-gray-100"
                onClick={() => {
                  setOpenContact(contact);
                  handleModal();
                }}
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {contact.name}
                </td>
                <td className="py-3 px-6 text-left">{contact.email}</td>
                <td className="py-3 px-6 text-left">{contact.phone}</td>
                <td className="py-3 px-6 text-left">
                  {getLifeCycleLabel(contact.life_cycle)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center disabled:opacity-50"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center disabled:opacity-50"
        >
          Próxima <ChevronRight className="ml-2 h-4 w-4" />
        </button>
      </div>

      {isModalOpen && (
        <NewContactForm
          setUpdateContacts={setUpdateContacts}
          handleModal={handleModal}
          openContact={openContact}
        />
      )}
    </div>
  );
}
