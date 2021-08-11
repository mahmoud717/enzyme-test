const Planet = ({ id, name, img, onDragStart }) => {
  return (
    <div
      draggable="true"
      onDragStart={onDragStart}
      className="grid grid-cols-2 h-32 border border-gray-200 my-4 planet"
      id={id}
    >
      <div className="relative">
        <img
          draggable="false"
          className="absolute top-0 left-0 w-full h-32 object-cover"
          src={img}
          alt="Planet"
        />
      </div>
      <div>
        <p className="text-3xl font-bold text-left p-10 h-full">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </p>
      </div>
    </div>
  );
};
export default Planet;
