import { useStock } from "../context/StockContext";

export default function SearchField() {
  const { handleSearchProduct } = useStock();
  return (
    <div className="relative w-full rounded-lg">
      <input
        className=" w-full peer rounded-lg border border-sky-600 bg-transparent px-4 py-2 text-sky-600 focus:outline-none"
        type="text"
        placeholder=""
        id="navigate_ui_input_33"
        onChange={(text) => handleSearchProduct(text.target.value)}
      />
      <label
        className="absolute -top-2 left-2 rounded-md bg-sky-600 px-2 text-xs text-sky-100 duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-2 peer-focus:bg-sky-600 peer-focus:text-xs peer-focus:text-sky-100"
        htmlFor="navigate_ui_input_33"
      >
        Search product
      </label>
    </div>
  );
}
