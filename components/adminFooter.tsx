import useTranslation from "../locals/localHook"

export default function AdminFooter() {
  const { t } = useTranslation();
  return (
    <footer className="row mx-0 bg-light text-dark border-top p-3 justify-content-center">
      <small>{t("CopyRights")}</small>
    </footer>
  )
}