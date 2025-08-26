import { promises as fs } from "node:fs";
import path from "node:path";
import { version } from "../../../../package.json";
import { ResourceService } from "./ResourceService";

/**
 * Service responsible for reading and parsing the build log.
 */
export class MetaService {
  private readonly logPath: string;

  /**
   * @param logPath Optional override for the log path; defaults to ./resources/build.log relative to the current working directory.
   */
  constructor(logPath = path.resolve(ResourceService.getResourcesPath(), "build.log")) {
    this.logPath = logPath;
  }

  /**
   * Reads and returns the raw text contents of the build log.
   */
  async getBuildLogText(): Promise<string> {
    try {
      const data = await fs.readFile(this.logPath, "utf-8");
      return data;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : typeof err === "string" ? err : "Unknown error";
      throw new Error(`Failed to read build log at ${this.logPath}: ${message}`);
    }
  }

  /**
   * Convenience method: returns the log split into lines (without trailing newlines).
   */
  async getBuildLogLines(): Promise<string[]> {
    const text = await this.getBuildLogText();
    // Normalize line endings and split
    return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  }

  async getVersion():Promise<string> {
    return version;
  }
}
