import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import type { Category } from "../../api/categories";

type Props = {
  open: boolean;
  category: Category | null;

  onClose: () => void;

  onSubmit: (
    id: string,
    data: {
      name: string;
      description?: string;
    }
  ) => Promise<void>;
};

export default function EditCategoryModal({
  open,
  category,
  onClose,
  onSubmit,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(
        category.description || ""
      );
    }
  }, [category]);

  if (!open || !category) {
    return null;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    await onSubmit(category!.id, {
      name,
      description,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          Editar Categoria
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            className="w-full rounded-lg border p-3"
            required
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            className="w-full rounded-lg border p-3"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-lg bg-yellow-500 px-4 py-2 text-white"
            >
              Atualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}