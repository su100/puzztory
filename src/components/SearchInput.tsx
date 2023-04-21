function SearchInput() {
  return (
    <form action="/story">
      <input
        name="q"
        className="px-2 py-1 w-[100%] rounded-lg border-gray-300 border"
        placeholder="검색어를 입력하세요(제목, 내용)"
      />
    </form>
  );
}

export default SearchInput;
