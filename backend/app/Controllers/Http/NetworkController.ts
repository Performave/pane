import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import sleep from "../../../util/sleep";
const Ping = require("ping-wrapper");
const Traceroute = require("nodejs-traceroute");

export default class NetworkController {
  public async index(ctx: HttpContextContract) {
    let IP_V4 = process.env.IP_V4 || "No IPV4 Set";
    let IP_V6 = process.env.IP_V6 || "No IPV6 Set";
    let LOCATION = process.env.LOCATION || "No Location Set";

    await sleep(3000);

    return {
      ip_v4: IP_V4,
      ip_v6: IP_V6,
      client_ip: ctx.request.ip(),
      location: LOCATION,
    };
  }

  public async ping(ctx: HttpContextContract) {
    const payload = await ctx.request.validate({
      schema: schema.create({
        address: schema.string({}, [rules.maxLength(500)]),
      }),
    });

    Ping.configure();

    let ping = new Ping(payload.address);

    const sendPing = () => {
      return new Promise((resolve, reject) => {
        let pings = [];
        let count = 0;
        ping.on("ping", (res) => {
          if (count >= 5) {
            ping.stop();
            return resolve(pings);
          }

          pings.push(res);
          count++;
        });

        ping.on("fail", (res) => {
          ping.stop();
          reject(res);
        });
      });
    };

    return await sendPing();
  }

  public async traceroute(ctx: HttpContextContract) {
    const payload = await ctx.request.validate({
      schema: schema.create({
        address: schema.string({}, [rules.maxLength(500)]),
      }),
    });

    const traceroute = () => {

      return new Promise((resolve) => {
        const tracer = new Traceroute();
        let logs = []

        tracer
          .on("pid", (pid) => {
            logs.push(`pid: ${pid}`);
          })
          .on("destination", (destination) => {
            logs.push(`destination: ${destination}`);
          })
          .on("hop", (hop) => {
            logs.push(`hop: ${JSON.stringify(hop)}`);
          })
          .on("close", (code) => {
            logs.push(`close: code ${code}`);
            resolve(logs.join('<br>'))
          });

        tracer.trace(payload.address);
      });
    };

    return await traceroute()
  }
}
