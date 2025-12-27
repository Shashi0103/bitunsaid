function AllMessagesButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        fixed top-4 right-4 z-40
        w-11 h-11 rounded-full
        bg-white/30 backdrop-blur-lg
        border border-white/30
        flex items-center justify-center
        text-xl
        hover:bg-white/50
        transition
      "
      title="All messages"
    >
      💬
    </button>
  );
}

export default AllMessagesButton;
