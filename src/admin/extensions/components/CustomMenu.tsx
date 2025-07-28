import { Button } from "@strapi/design-system"

export default function CustomMenu() {
  return (
    <div className="p-16 bg-red-500">
      <p>custom menu content</p>

      <Button className="btn" onClick={() => alert("hello")}>
        click
      </Button>
    </div>
  )
}
