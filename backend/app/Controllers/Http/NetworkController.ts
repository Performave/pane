import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { randomBytes } from "crypto";
const { exec } = require("child_process");

export default class NetworkController {
  public async index(ctx: HttpContextContract) {
    let IP_V4 = process.env.IP_V4 || "No IPV4 Set";
    let IP_V6 = process.env.IP_V6 || "No IPV6 Set";
    let LOCATION = process.env.LOCATION || "No Location Set";

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
        address: schema.string({}, [rules.maxLength(500), rules.url()]),
      }),
    });

    const sendPing = () => {
      return new Promise((resolve, reject) => {
        exec(`ping ${payload.address} -c 5`, (error, stdout, stderr) => {
          if (error) {
            reject(error.message);
            return;
          }
          if (stderr) {
            resolve(stderr);
            return;
          }
          resolve(stdout);
        });
      });
    };

    return await sendPing();
  }

  public async traceroute(ctx: HttpContextContract) {
    const payload = await ctx.request.validate({
      schema: schema.create({
        address: schema.string({}, [rules.maxLength(500), rules.url()]),
      }),
    });

    const traceroute = () => {
      return new Promise((resolve, reject) => {
        exec(`traceroute ${payload.address}`, (error, stdout, stderr) => {
          if (error) {
            reject(error.message);
            return;
          }
          if (stderr) {
            resolve(stderr);
            return;
          }
          resolve(stdout);
        });
      });
    };

    return await traceroute();
  }

  public async speedtest() {
    return randomBytes(1000000 * 500); // 500 megabytes
  }
}
