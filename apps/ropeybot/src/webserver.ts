import {
    createServer,
    type IncomingMessage,
    type Server,
    type ServerResponse,
} from "http";

export interface WebRequest {
    url: URL;
    method: string;
    body: string;
}

export interface WebResponse {
    status: number;
    body: string;
    contentType?: string;
}

export type RouteHandler = (req: WebRequest) => WebResponse;

const MAX_BODY_BYTES = 64 * 1024;

export class WebServer {
    private routes = new Map<string, RouteHandler>();
    private server: Server;

    public constructor(private port: number) {
        this.server = createServer((req, res) => this.handle(req, res));
    }

    public route(path: string, handler: RouteHandler): void {
        this.routes.set(path, handler);
    }

    public start(): void {
        this.server.listen(this.port, () =>
            console.log(`Web server listening on port ${this.port}`),
        );
    }

    private handle(req: IncomingMessage, res: ServerResponse) {
        const chunks: Buffer[] = [];
        let size = 0;
        let tooLarge = false;
        req.on("data", (chunk: Buffer) => {
            size += chunk.length;
            if (size > MAX_BODY_BYTES) {
                tooLarge = true;
            } else {
                chunks.push(chunk);
            }
        });
        req.on("end", () => {
            let result: WebResponse;
            if (tooLarge) {
                result = { status: 413, body: "Too large" };
            } else {
                const url = new URL(req.url ?? "/", "http://localhost");
                const handler = this.routes.get(url.pathname);
                try {
                    result = handler?.({
                        url,
                        method: req.method ?? "GET",
                        body: Buffer.concat(chunks).toString("utf-8"),
                    }) ?? { status: 404, body: "Not found" };
                } catch (e) {
                    console.error("Web handler error", e);
                    result = { status: 500, body: "Internal error" };
                }
            }
            res.writeHead(result.status, {
                "Content-Type":
                    result.contentType ?? "text/html; charset=utf-8",
            });
            res.end(result.body);
        });
    }
}

export function escapeHtml(s: string): string {
    return s.replace(
        /[&<>"']/g,
        (c) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            })[c]!,
    );
}
