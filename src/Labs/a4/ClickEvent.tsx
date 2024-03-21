function ClickEvent() {
    const hello = () => {
      alert("Hello World!");
    };
    const lifeIs = (good: string) => {
      alert(`Life is ${good}`);
    };
    return (
      <div>
        <h2>Click Event</h2>
        <button onClick={hello}>
          Click Hello</button>
        <button onClick={() => lifeIs("Good!")}>
          Click Good</button>
        <button
          onClick={() => {
            hello();
            lifeIs("Great!");
          }}
        >
          Click Hello 3
        </button>
      </div>
    );
  }
  export default ClickEvent;