import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    healthCheck() {
        return {
            status: "ok",
            message: "Auralis API is running",
        };
    }
}
