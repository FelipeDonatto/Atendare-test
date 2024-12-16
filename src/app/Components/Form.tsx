import React, { Dispatch, SetStateAction } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { X, Trash } from "lucide-react";
import * as Yup from "yup";
import axios from "axios";
import { Contact } from "../Interfaces/Contact";
import { replaceNullsWithUndefined } from "../Utils/Utils";

export const NewContactForm: React.FC<{
  handleModal: Dispatch<SetStateAction<boolean>>;
  setUpdateContacts: Dispatch<SetStateAction<boolean>>;
  openContact: Contact | null;
}> = ({ handleModal, openContact, setUpdateContacts }) => {
  const initialValues: Partial<Contact> = replaceNullsWithUndefined(
    openContact
  ) || {
    name: "",
    full_name: "",
    document: "",
    email: "",
    phone: "",
    site: "",
    birth_date: "",
    customer_date: "",
    gender: 1,
    life_cycle: 0,
    source_id: undefined,
    jobtitle_id: undefined,
    parent_id: undefined,
    responsible_id: undefined,
    company_id: undefined,
    address: {
      country: "",
      state: "",
      city: "",
      neighborhood: "",
      postal_code: "",
      street: "",
      number: undefined,
      complement: "",
      type: undefined,
      is_main: false,
    },
    addresses: [],
    groups: [],
    tags: [],
    emails: [],
    phones: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Nome obrigatório"),
    full_name: Yup.string(),
    document: Yup.string(),
    email: Yup.string().email("E-mail inválido"),
    phone: Yup.string(),
    site: Yup.string().url("URL inválida"),
    birth_date: Yup.date().nullable(),
    customer_date: Yup.date().nullable(),
    gender: Yup.number(),
    life_cycle: Yup.number(),
    source_id: Yup.number().nullable(),
    jobtitle_id: Yup.number().nullable(),
    parent_id: Yup.number().nullable(),
    responsible_id: Yup.number().nullable(),
    company_id: Yup.number().nullable(),
    address: Yup.object().nullable(),
  });

  const updating = initialValues.id !== undefined;

  const handleDeleteContact = async () => {
    try {
      await axios.delete(`/api/contacts/${initialValues.id}`);
      handleModal(false);
      setUpdateContacts(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {updating ? "Atualizar" : "Adicionar novo"} contato
          </h2>
          <button
            onClick={() => handleModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="container mx-auto p-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                if (updating) {
                  await axios.patch(`/api/contacts/${initialValues.id}`, {
                    name: values.name,
                    full_name: values.full_name,
                    gender: values.gender,
                    email: values.email,
                    life_cycle: values.life_cycle,
                    document: values.document,
                    phone: values.phone,
                    site: values.site,
                    birth_date: values.birth_date,
                    customer_date: values.customer_date,
                  });
                } else {
                  await axios.post("/api/contacts", values);
                }
              } catch (error) {
                console.log(error);
              }
              setUpdateContacts(true);
              setSubmitting(false);
              handleModal(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nome
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="full_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nome completo
                  </label>
                  <Field
                    type="text"
                    name="full_name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="full_name"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="document"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CPF
                  </label>
                  <Field
                    type="text"
                    name="document"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="document"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    E-mail
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Telefone
                  </label>
                  <Field
                    type="tel"
                    name="phone"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="site"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Site
                  </label>
                  <Field
                    type="url"
                    name="site"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="site"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="birth_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Data de nascimento
                  </label>
                  <Field
                    type="date"
                    name="birth_date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="birth_date"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="customer_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cliente desde
                  </label>
                  <Field
                    type="date"
                    name="customer_date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="customer_date"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gênero
                  </label>
                  <Field
                    as="select"
                    name="gender"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value={1}>Nenhum</option>
                    <option value={2}>Masculino</option>
                    <option value={3}>Feminino</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="life_cycle"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Ciclo de vida
                  </label>

                  <Field
                    as="select"
                    name="life_cycle"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                  </Field>
                  <ErrorMessage
                    name="life_cycle"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-4 mt-6 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    Endereço
                  </h3>
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="address.country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    País
                  </label>
                  <Field
                    type="text"
                    disabled={updating}
                    name="address.country"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="address.country"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="address.state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Estado
                  </label>
                  <Field
                    type="text"
                    disabled={updating}
                    name="address.state"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="address.state"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="address.city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cidade
                  </label>
                  <Field
                    type="text"
                    disabled={updating}
                    name="address.city"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="address.city"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="address.neighborhood"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bairro
                  </label>
                  <Field
                    type="text"
                    disabled={updating}
                    name="address.neighborhood"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="address.neighborhood"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="address.postal_code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CEP
                  </label>
                  <Field
                    type="text"
                    disabled={updating}
                    name="address.postal_code"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="address.postal_code"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="address.street"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rua
                  </label>
                  <Field
                    type="text"
                    disabled={updating}
                    name="address.street"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="address.street"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="address.number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Número
                  </label>
                  <Field
                    type="number"
                    disabled={updating}
                    name="address.number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="address.number"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="address.complement"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Complemento
                  </label>
                  <Field
                    type="text"
                    disabled={updating}
                    name="address.complement"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="address.complement"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="address.type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tipo de endereço
                  </label>
                  <Field
                    as="select"
                    disabled={updating}
                    name="address.type"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value={0}>Residencial</option>
                    <option value={1}>Comercial</option>
                    <option value={2}>Outro</option>
                  </Field>
                  <ErrorMessage
                    name="address.type"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-1 flex">
                  <label
                    htmlFor="address.is_main"
                    className="flex items-center"
                  >
                    <Field
                      type="checkbox"
                      disabled={updating}
                      name="address.is_main"
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Endereço principal?
                    </span>
                  </label>
                  <ErrorMessage
                    name="address.is_main"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div className="col-span-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`mr-0 py-2  border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      updating
                        ? "w-3/4 bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                        : "w-full bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    }`}
                  >
                    {updating ? "Atualizar" : "Adicionar"} contato
                  </button>

                  {updating && (
                    <button
                      type="button"
                      disabled={isSubmitting}
                      className="inline-flex justify-around  w-1/4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                         bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={handleDeleteContact}
                    >
                      Remover contato <Trash className="mr-2 h-4 w-4" />
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
