import { useEffect, useState } from "react";

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    type Category,
} from "../../api/categories";

import CreateCategoryModal from "../../components/Categories/CreateCategoryModal";
import EditCategoryModal from "../../components/Categories/EditCategoryModal";
import DeleteCategoryModal from "../../components/Categories/DeleteCategoryModal";

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);


    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    async function loadCategories() {
        try {
            setLoading(true);

            const data = await getCategories();

            setCategories(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreateCategory(data: {
        name: string;
        description?: string;
    }) {
        await createCategory(data);

        await loadCategories();
    }

    async function handleEditCategory(
        id: string,
        data: {
            name: string;
            description?: string;
        }
    ) {
        await updateCategory(id, data);

        await loadCategories();
    }

    async function handleDeleteCategory(id: string) {
        try {
            await deleteCategory(id);

            await loadCategories();
        } catch {
            alert(
                "Não foi possível excluir. Pode existir transação usando essa categoria."
            );
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Categorias
                    </h1>

                    <p className="text-gray-500">
                        Organize e gerencie suas categorias financeiras
                    </p>
                </div>

                <button
                    onClick={() => setCreateModalOpen(true)}
                    className="
                        rounded-lg
                        bg-blue-600
                        px-4
                        py-2
                        font-medium
                        text-white
                        hover:bg-blue-700
                    "
                >
                    + Nova Categoria
                </button>
            </div>

            <div className="overflow-hidden rounded-xl border  bg-white shadow-sm">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left">
                                Nome
                            </th>

                            <th className="px-4 py-3 text-left">
                                Descrição
                            </th>

                            <th className="px-4 py-3 text-center">
                                Ações
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="p-4 text-center"
                                >
                                    Carregando categorias...
                                </td>
                            </tr>
                        ) : categories.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="p-4 text-center"
                                >
                                    Nenhuma categoria cadastrada
                                </td>
                            </tr>
                        ) : (
                            categories.map((category) => (
                                <tr
                                    key={category.id}
                                    className="border-t"
                                >
                                    <td className="px-4 py-3">
                                        {category.name}
                                    </td>

                                    <td className="px-4 py-3 text-gray-600">
                                        {category.description || "-"}
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedCategory(category);
                                                    setEditModalOpen(true);
                                                }}
                                                className="
                                                    rounded-md bg-yellow-500 px-3  py-1 text-sm
                                                    text-white
                                                    "
                                            >
                                                Editar
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setSelectedCategory(category);
                                                    setDeleteModalOpen(true);
                                                }}
                                                 className="rounded-md bg-red-600 px-3  py-1 text-sm text-white">
                                                Excluir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <CreateCategoryModal
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateCategory}
            />

            <EditCategoryModal
                open={editModalOpen}
                category={selectedCategory}
                onClose={() => {
                    setEditModalOpen(false);
                    setSelectedCategory(null);
                }}
                onSubmit={handleEditCategory}
            />

            <DeleteCategoryModal
                open={deleteModalOpen}
                category={selectedCategory}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setSelectedCategory(null);
                }}
                onConfirm={handleDeleteCategory}
            />
        </div>
    );
}