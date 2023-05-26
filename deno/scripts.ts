// command | deno run --allow-run scripts.ts <script> |

// save the script name in a variable
const scriptName = Deno.args[0];

// create a variable to hold the child process
let p;

// switch statement for each possible script
switch (scriptName) {
  case "start":
    // run a command
    p = Deno.run({ cmd: ["deno", "run", "file.ts"] });
    // process output when it completes
    await p.status();
    break;

  case "dev":
    p = Deno.run({
      cmd: ["deno", "run", "--allow-all", "./file.ts"],
    });
    await p.status();
    break;

  // default output if not a script you made
  default:
    console.log("No Script by that name");
}

// https://deno.land/api@v1.34.0?s=Deno.Command
// denon run --allow-env --allow-net main.ts
// https://deno.com/manual@v1.34.0/getting_started/configuration_file
