import { test, expect } from "@playwright/test";

test("list orders", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  expect(
    page.getByRole("cell", { name: "Customer 1", exact: true }),
  ).toBeVisible();

  await expect(page.getByRole("cell", { name: "Customer 10" })).toBeVisible();
});

test("paginate orders to next page", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Próxima página" }).click();

  const url = await page.url();

  expect(url).toContain("page=2");

  await page.waitForTimeout(250);
});

test("paginate orders to previous page", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Próxima página" }).click();

  await page.getByRole("button", { name: "Página anterior" }).click();

  const url = await page.url();

  expect(url).toContain("page=1");

  await page.waitForTimeout(250);
});

test("paginate orders to first page", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Última página" }).click();

  await page.getByRole("button", { name: "Primeira página" }).click();

  await expect(page.getByTestId("pagination-current-page")).toHaveText("1");
});

test("paginate orders to last page", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Última página" }).click();

  const paginationTotalPages = await page.evaluate(
    () =>
      document.querySelector('[data-testid="pagination-total-pages"]')
        ?.textContent,
  );

  if (paginationTotalPages)
    await expect(page.getByTestId("pagination-current-page")).toHaveText(
      paginationTotalPages,
    );
});

test("filter by order id", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByPlaceholder("ID do pedido").fill("order-11");
  await page.getByRole("button", { name: "Filtrar resultados" }).click();

  await expect(page.getByRole("cell", { name: "order-11" })).toBeVisible();
});

test("filter by customer name", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByPlaceholder("Nome do cliente").fill("Customer 11");
  await page.getByRole("button", { name: "Filtrar resultados" }).click();

  await expect(page.getByRole("cell", { name: "Customer 11" })).toBeVisible();
});

test("filter by status", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("combobox").click();
  await page.getByLabel("Pendente").click();

  await page.getByRole("button", { name: "Filtrar resultados" }).click();

  await page.waitForTimeout(250);

  const tableRows = await page.getByTestId("order-table-row-status").all();

  expect(tableRows.length).toBeGreaterThan(0);

  await page.waitForTimeout(250);
});
