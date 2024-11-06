// /src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { Todo, useTodoStore } from "../store/todo/store";
import SwitchComponent from "../component/switch/switch";
import ShowComp from "../component/showpicture/showpicture_comp"; // Import ShowComp

function Home() {
  const { todos, getTodos, errorMessage } = useTodoStore();

  useEffect(() => {
    const fetchData = async () => {
      await getTodos();
    };

    fetchData();
  }, [getTodos]);

  const handleUnchecked = (data: Todo) => {
    console.log(data);

    if (data.completed === false) {
      console.log("checked");
    }

    if (data.completed === true) {
      console.log("unchecked");
    }
  };

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <li>
            <span className="text-red-500">ID:</span> {todo.id}
            <h1 className="text-red-500 text-justify">{todo.title}</h1>
          </li>
          <SwitchComponent
            checked={todo.completed}
            onChange={() => handleUnchecked(todo)}
          />
          {/* Tambahkan ShowComp di sini */}
          <ShowComp />
        </div>
      ))}
    </div>
  );
}

export default Home;
