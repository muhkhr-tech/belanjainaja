'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import EditItemAction from "./components/action/editItem"
import GetItem from "./components/action/getItem"

export default function EditItem({ itemId, itemTypes }: any) {
  const [modal, setModal] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isLoadData, setLoadData] = useState(false)
  const [inputData, setInputData] = useState({
    id: '',
    name: '',
    typeId: '',
    price: 0
  })

  const [messageInfo, setMessageInfo] = useState({
    status: '',
    message: ''
  })

  const router = useRouter()

  const handleChange = async (e: any) => {
    setModal(!modal)

    if (!modal) {
      setLoadData(true)

      let { resp }: any = {}

      try {
        resp = await GetItem(itemId)
      } catch (err) {
        console.log(err)
      } finally {
        setLoadData(false)
      }

      setInputData({
        id: resp.id,
        name: resp.name,
        typeId: resp.typeId,
        price: resp.price
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
      await EditItemAction(inputData, inputData.id)
      setMessageInfo((prevData) => ({
        ...prevData,
        ["status"]: "success",
        ["message"]: "Berhasil mengubah data."
      }))

      router.refresh()
      setModal(false)

    } catch (err) {
      setMessageInfo((prevData) => ({
        ...prevData,
        ["status"]: "error",
        ["message"]: "Gagal mengubah data."
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

      <button className="btn btn-sm text-white btn-info" onClick={handleChange}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
        </svg> Ubah
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">Ubah Barang</h3>
          {isLoadData ? <div className="w-full flex"><span className="loading mx-auto"></span></div>
            : <form onSubmit={handleSubmit}>
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
            </form>}
        </div>
      </div>
    </div>
  )
}