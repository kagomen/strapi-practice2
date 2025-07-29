import { LinkButton } from "@strapi/design-system"
import { Eye } from "@strapi/icons"
import { unstable_useContentManagerContext as useContentManagerContext } from "@strapi/strapi/admin"

const PreviewLink = () => {
  const { form, isCreatingEntry } = useContentManagerContext()
  const { values } = form as any

  if (isCreatingEntry || !values?.documentId) {
    return null
  }

  const previewUrl = `${process.env.STRAPI_ADMIN_CLIENT_API_DRAFT_URL}?secret=${process.env.STRAPI_ADMIN_DRAFT_MODE_SECRET}&documentId=${values.documentId}`

  return (
    <LinkButton
      size="S"
      startIcon={<Eye />}
      href={previewUrl}
      target="_blank"
      rel="noopener noreferrer"
      title="preview"
    >
      プレビュー
    </LinkButton>
  )
}

export default PreviewLink
