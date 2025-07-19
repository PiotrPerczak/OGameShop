
// Modal component for displaying detailed game info and allowing add to cart
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { Game } from "./ProductList";


// Props for GameModal: open/close state, game data, and add-to-cart handler
interface GameModalProps {
  open: boolean;
  onClose: () => void;
  game: Game | null;
  onAddToCart?: (game: Game) => void;
}


export default function GameModal({ open, onClose, game, onAddToCart }: GameModalProps) {
  // If no game is selected, don't render the modal
  if (!game) return null;
  return (
    <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center">
      {/* Modal background overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
      <DialogPanel className="relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 flex flex-col items-center">
        {/* Game title */}
        <DialogTitle className="text-2xl font-bold text-gray-900 mb-2 text-center">
          {game.name}
        </DialogTitle>
        {/* Game image */}
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-56 object-cover rounded-xl mb-4 shadow-lg"
        />
        {/* Game details */}
        <div className="w-full text-center">
          <p className="text-lg text-gray-700 mb-2">Released: <span className="font-semibold">{game.released}</span></p>
          <p className="text-lg text-gray-700 mb-2">Rating: <span className="font-semibold">{game.rating}</span></p>
          <p className="text-2xl font-bold text-blue-700 mb-4">$100</p>
        </div>
        {/* Action buttons */}
        <div className="flex gap-4 mt-2">
          <button
            onClick={() => game && typeof onAddToCart === 'function' && onAddToCart(game)}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Add to cart
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition"
          >
            Close
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
