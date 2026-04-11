import MenuCard from "./MenuCard";

export default function MenuGrid({ menus, onSelectMenu }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {menus.map((menu) => (
        <MenuCard key={menu.id} menu={menu} onSelect={onSelectMenu} />
      ))}
    </div>
  );
}
