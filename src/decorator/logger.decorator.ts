import fs, { appendFile } from "fs";
export function Logger(strategy: "stdout" | "file" = "stdout") {


    return function <This, Args extends any[], Return>(
        originalMethod: (this: This, ...args: Args) => Return,
        context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
    ) {
        if (context.kind !== "method") throw new Error("Can apply only for methods");
        
        return function(this: This, ...args: Args): Return {
            const result = originalMethod.apply(this, args);
            const safeArgs = JSON.stringify(args);

            if (strategy === "stdout") {
                console.log(`[LOG] executed ${String(context.name)} with args:`, safeArgs);
            } else if (strategy === "file") {
                const safeResult = result === undefined 
                    ? "void" 
                    : JSON.stringify(result);
                const logMessage = `[LOG-${new Date().toJSON()}] Method: ${String(context.name)} | Args: ${safeArgs} | Result: ${safeResult}\n`;
                fs.appendFileSync("logs.txt" , logMessage);
            }

            return result;
        }
    }
}