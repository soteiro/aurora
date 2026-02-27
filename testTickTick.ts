import { getActiveTickTickTasks } from "@/services/ticktickService";

console.log("Testing getActiveTickTickTasks...")

const tassk = getActiveTickTickTasks()
    .then(tasks => {
        console.log("Active TickTick Tasks:")
        console.log(tasks)
    })
    .catch(error => {
        console.error("Error fetching TickTick tasks:", error)
    })