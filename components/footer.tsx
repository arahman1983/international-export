import useTranslation from "../locals/localHook"

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="row mx-0 bg-gradient justify-content-center">
      <small>{t("CopyRights")}</small>
    </footer>
  )
}