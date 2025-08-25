import { describe, expect, it } from "vitest";
import { sanitizeString } from "../../src/middlewares/sanitizeHtml";

describe("sanitizeBody middleware - Unit", () => {
    it("Should remove HTML tags from string fields", () => {
        const firstname = "<b>John</b>";
        const lastname = "<script>alert('xss')</script>Doe";

        const firstnameClean = sanitizeString(firstname);
        const lastnameClean = sanitizeString(lastname);

        expect(firstnameClean).toBe("John");
        expect(lastnameClean).toBe("Doe");
    });

    it("Should trim whitespace arount sanitized strings", () => {
        const firstname = "    <b> John </b>    ";
        const lastname = "<script>  alert('xss')  </script> Doe  ";
        const firstnameClean = sanitizeString(firstname);
        const lastnameClean = sanitizeString(lastname);

        expect(firstnameClean).toBe("John");
        expect(lastnameClean).toBe("Doe");
    });
});