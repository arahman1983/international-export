import {useState, useRef} from 'react'
import useTranslation from "../locals/localHook"

export default function ContactForm () {
  const { t } = useTranslation();
  const [cEmail, setCEmail] = useState<string>("")
  const [cSubject, setCSubject] = useState<string>("")
  const [cMessage, setCMessage] = useState<string>("")

  const refEmail = useRef<HTMLInputElement>(null);
  const refSubject = useRef<HTMLInputElement>(null);
  const refMessage = useRef<HTMLTextAreaElement>(null);


  const handleEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
    refEmail.current.classList.remove('border')
    refEmail.current.classList.remove('border-danger')
    setCEmail(e.target.value)
  }
  const handleSubject = (e:React.ChangeEvent<HTMLInputElement>) => {
    refSubject.current.classList.remove('border')
    refSubject.current.classList.remove('border-danger')
    setCSubject(e.target.value)
  }
  const handleMessage = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    refMessage.current.classList.remove('border')
    refMessage.current.classList.remove('border-danger')

    setCMessage(e.target.value)
  }

  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  const sendMessage = (e:React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if(!re.test(cEmail.toLowerCase())){
      refEmail.current.classList.add('border')
      refEmail.current.classList.add('border-danger')
      refEmail.current.focus();
      return false
    }
    if(cSubject.trim().length === 0){
      refSubject.current.classList.add('border')
      refSubject.current.classList.add('border-danger')
      refSubject.current.focus();
      return false
    }
    if(cMessage.trim().length === 0){
      refMessage.current.classList.add('border')
      refMessage.current.classList.add('border-danger')
      refMessage.current.focus();
      return false
    }
  }
  return(
    <>
    <h4 className="text-danger mb-4">{t("EmailUs")}</h4>
      <form onSubmit={sendMessage}>
        <div className="form-group">
          <input type="email" ref={refEmail} className="form-control" placeholder={t("Email")} value={cEmail} onChange={handleEmail}/>
        </div>
        <div className="form-group">
          <input type="text" ref={refSubject} className="form-control" placeholder={t("Subject")} value={cSubject} onChange={handleSubject}/>
        </div>
        <div className="form-group">
          <textarea className="form-control" ref={refMessage} rows={10} placeholder={t("Message")} value={cMessage} onChange={handleMessage}></textarea>
        </div>
        <div className="form-group">
          <button className="btn btnPrimary btn-block">{t("Send")}</button>
        </div>
      </form>
    </>
  )
}