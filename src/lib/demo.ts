import { db } from "~/server/db";

const project = await db.project.findUnique({
    where: { id: "cm7dip7wr0009zwk0qpurqett" }
});
console.log(project);
