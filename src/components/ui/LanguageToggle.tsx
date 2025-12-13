import React, {useState, useEffect} from 'react'

const STORAGE_KEY = 'preferredLang'

export default function LanguageToggle(){
  const [lang, setLang] = useState<string>(() => {
    try{
      return localStorage.getItem(STORAGE_KEY) || 'en'
    }catch(e){
      return 'en'
    }
  })

  useEffect(()=>{
    try{ localStorage.setItem(STORAGE_KEY, lang) }catch(e){}
  },[lang])

  return (
    <div>
      <label htmlFor="lang-toggle">Language: </label>
      <select id="lang-toggle" value={lang} onChange={e => setLang(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
      </select>
    </div>
  )
}
