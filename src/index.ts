import digest from "./digest";
import { logger } from "./utils/logger";

logger.info("Starting Aurora")
digest().then(() => {
    console.table("Aurora finished successfully")
}).catch((error) => {
    console.error("Error running Aurora", error)
});