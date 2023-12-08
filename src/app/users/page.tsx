import { calculateOverrideValues } from "next/dist/server/font-utils";
import UsersTable from "../components/users/users.table";

const calculatePagesCount = (pageSize: number, totalCount: number) => {
  return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
};

const UsersPage = async (props: any) => {
  const LIMIT = 3;
  const page = props?.searchParams?.page ?? 1;

  const res = await fetch(
    `http://localhost:8000/users?_page=${page}&_limit=${LIMIT}`,
    {
      method: "GET",
      next: { tags: ["list-users"] },
    }
  );
  const total_items = +(res.headers?.get("X-Total-Count") ?? 0);
  const totalPages = calculatePagesCount(LIMIT, total_items);

  const data = await res.json();
  console.log("Check props", props);

  return (
    <div>
      <UsersTable
        users={data ? data : []}
        meta={{ current: +page, pageSize: LIMIT, total: total_items }}
      />
    </div>
  );
};

export default UsersPage;
