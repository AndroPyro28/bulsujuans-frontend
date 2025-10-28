import { DataTable } from "@/components/data-table";
import React from "react";
import { columns } from "./columns";

export const ComplainsList = () => {
  const mockData = [
    {
      id: "1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero eum, repudiandae exercitationem iure ut alias, aliquid dignissimos, sunt nulla explicabo ipsa atque omnis. Atque accusantium aliquam voluptatem expedita cumque, nisi reprehenderit voluptate incidunt non repellendus sequi delectus. Molestias consequuntur, temporibus fuga vel quaerat tempore reiciendis quis nemo quasi alias qui?",
      victimName: "John Doe",
      email: "johndoe@gmail.com",
      contactNo: "+123352322",
      status: "PENDING",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero eum, repudiandae exercitationem iure ut alias, aliquid dignissimos, sunt nulla explicabo ipsa atque omnis. Atque accusantium aliquam voluptatem expedita cumque, nisi reprehenderit voluptate incidunt non repellendus sequi delectus. Molestias consequuntur, temporibus fuga vel quaerat tempore reiciendis quis nemo quasi alias qui?",
      victimName: "andrei",
      email: "andrei@gmail.com",
      contactNo: "+123352322",
      status: "ACCEPTED",
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero eum, repudiandae exercitationem iure ut alias, aliquid dignissimos, sunt nulla explicabo ipsa atque omnis. Atque accusantium aliquam voluptatem expedita cumque, nisi reprehenderit voluptate incidunt non repellendus sequi delectus. Molestias consequuntur, temporibus fuga vel quaerat tempore reiciendis quis nemo quasi alias qui?",
      victimName: "denver",
      email: "denver@gmail.com",
      contactNo: "+123352322",
      status: "COMPLETED",
      createdAt: new Date().toISOString(),
    },
  ];
  return (
    <div>
      <DataTable columns={columns} data={mockData} />
    </div>
  );
};
