'use client'

import { useState } from "react"
import AddItemAction from "./components/action/addItem"
import { useRouter } from "next/navigation"

export default function AddItem({ itemTypes }: any) {
  const [modal, setModal] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [inputData, setInputData] = useState({
    name: '',
    typeId: 0,
    price: ''
  })
  const [messageInfo, setMessageInfo] = useState({
    status: '',
    message: ''
  })

  const router = useRouter()

  const handleChange = (e: any) => {
    setModal(!modal)

    if (modal) {
      setInputData({
        name: '',
        typeId: 0,
        price: ''
      })
    }
  }

  const handleInput = (e: any) => {
    setInputData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  const hideMassageInfo = () => {
    setMessageInfo((prevData) => ({
      ...prevData,
      ["status"]: "",
      ["message"]: ""
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    setLoading(true)

    try {
      await AddItemAction(inputData)
      router.refresh()
      setModal(false)
      setMessageInfo((prevData) => ({
        ...prevData,
        ["status"]: "success",
        ["message"]: "Berhasil menambah data."
      }))

      setInputData({
        name: '',
        typeId: 0,
        price: ''
      })

    } catch (err) {
      setMessageInfo((prevData) => ({
        ...prevData,
        ["status"]: "error",
        ["message"]: "Gagal menambah data."
      }))

    } finally {
      setLoading(false)
      setTimeout(hideMassageInfo, 2000)
    }
  }

  return (
    <div>
      {messageInfo.status == "success" &&
        <div className="toast toast-center z-50">
          <div className="alert alert-success text-white py-2">
            <span className="text-sm">{messageInfo.message}</span>
          </div>
        </div>}

      {messageInfo.status == "error" &&
        <div className="toast toast-center z-50">
          <div className="alert alert-error text-white py-2">
            <span className="text-sm">{messageInfo.message}</span>
          </div>
        </div>}

      <button className="btn btn-sm mb-5 text-white btn-success" onClick={handleChange}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
        </svg> Tambah
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5 border-b-2 pb-2">Tambah Barang</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <div className="label">
                <span className="label-text">Nama Barang</span>
              </div>
              <input
                type="text"
                name="name"
                value={inputData.name}
                onChange={handleInput}
                className="input input-sm w-full input-bordered"
                placeholder="Sabun"
              />
            </div>
            <div className="form-control">
              <div className="label">
                <span className="label-text">Jenis Barang</span>
              </div>
              <select name="typeId" required={true} value={inputData.typeId} onChange={handleInput}
                className="select select-sm select-bordered">
                <option value="">-Pilih-</option>
                {itemTypes.map((type: any, index: any) => (
                  <option key={index} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <div className="label">
                <span className="label-text">Harga Barang (Rp)</span>
              </div>
              <input
                type="text"
                name="price"
                value={inputData.price}
                onChange={handleInput}
                className="input input-sm w-full input-bordered"
                placeholder="3000"
              />
            </div>
            <div className="modal-action">
              {!isLoading ? (
                <div>
                  <button type="button" className="btn btn-sm me-1" onClick={handleChange}>
                    Batal
                  </button>
                  <button type="submit" className="btn btn-sm btn-primary">
                    Simpan
                  </button>
                </div>
              ) : (
                <button type="button" className="btn btn-sm loading">
                  {/* Menyimpan... */}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}