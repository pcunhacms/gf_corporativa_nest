import type { Category } from "../../api/categories";

type Props = {
    open: boolean;
    category: Category | null;
    onClose: () => void;
    onConfirm: (id: string) => Promise<void>;
};

export default function DeleteCategoryModal({
    open,
    category,
    onClose,
    onConfirm,
}: Props) {
    if (!open || !category) {
        return null;
    }

    const currentCategory = category;

    async function handleDelete() {
        await onConfirm(currentCategory.id);
        onClose();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-xl bg-white p-6">
                <h2 className="mb-4 text-xl font-bold text-red-600">
                    Excluir Categoria
                </h2>

                <p className="mb-6 text-gray-600">
                    Tem certeza que deseja excluir a categoria{" "}
                    <strong>{category.name}</strong>?
                </p>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="rounded-lg border px-4 py-2"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleDelete}
                        className="rounded-lg bg-red-600 px-4 py-2 text-white"
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
}