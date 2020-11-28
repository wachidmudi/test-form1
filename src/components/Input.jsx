import { useWatch } from "react-hook-form"
import { products as productsItem } from "../data";
import minusIcon from '../assets/icon_minus.svg'

export default function Input({
  id,
  label,
  type,
  placeholder,
  register,
  value,
  name,
  error,
  index
}) {
  return (
    <div className="form-group col">
      <label htmlFor={id}>
        {label}
        <span className="text-danger">*</span>
      </label>
      <input
        id={id}
        className="form-control"
        type={type}
        placeholder={placeholder}
        name={name}
        ref={register}
        value={value}
      />
      {
        error?.length > 0 &&
        error[index]?.[id]?.type === "required" &&
        <span className="text-danger">Required</span>
      }
      {
        error?.length > 0 &&
        error[index]?.[id]?.type === "positive" &&
        <span className="text-danger">{label} must be &gt; 0</span>
      }
    </div>
  )
}

export const SelectDistribution = ({ control, register, errors }) => {
  const name = useWatch({
    control,
    name: 'name',
    defaultValue: ''
  })

  return (
    <>
      <label htmlFor="distribution">
        Distribution Center
                <span className="text-danger">*</span>
      </label>
      {
        !name ? (
          <p className="p-3 shadow">No data available</p>
        ) : (
            <select
              id="distribution"
              className="form-control"
              name="distribution"
              defaultValue=""
              ref={register({ required: true })}
            >
              <option value="" disabled>Distribution Center</option>
              <option value="tangerang">DC Tangerang</option>
              <option value="cikarang">DC Cikarang</option>
            </select>
          )
      }
      {errors.distribution && <span className="text-danger">Required</span>}
    </>
  )
}

export const SelectPaymentType = ({ control, register, errors }) => {
  const name = useWatch({
    control,
    name: 'name',
    defaultValue: ''
  })

  const distribution = useWatch({
    control,
    name: 'distribution',
    defaultValue: ''
  })

  return (
    <>
      {
        name && distribution && (
          <>
            <div className="form-row">
              <div className="form-group col-md-5">
                <label htmlFor="payment">
                  Payment Type
                      <span className="text-danger">*</span>
                </label>
                <select
                  id="payment"
                  className="form-control"
                  name="payment"
                  defaultValue=""
                  ref={register({ required: true })}
                >
                  <option value="" disabled>Payment Type</option>
                  <option value="cash1">Cash H+1</option>
                  <option value="cash3">Cash H+3</option>
                  <option value="cash7">Cash H+7</option>
                  <option value="transfer1">Transfer H+1</option>
                  <option value="transfer3">Transfer H+3</option>
                  <option value="transfer7">Transfer H+7</option>
                </select>
                {errors.payment && <span className="text-danger">Required</span>}
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="expired_date">
                  Expired Date
                      <span className="text-danger">*</span>
                </label>
                <input
                  id="expired"
                  className="form-control"
                  type="date"
                  name="expired_date"
                  min={new Date().toLocaleString('sv').slice(0, 10)}
                  ref={register({ required: true })}
                  defaultValue="0000-00-00"
                  placeholder="Expired Date"
                />
                {errors.expired_date && <span className="text-danger">Required</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-8">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  className="form-control"
                  rows={4}
                  defaultValue={""}
                  name="notes"
                  ref={register()}
                />
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

export const TotalPrice = ({ control }) => {
  const products = useWatch({
    control,
    name: 'products',
    defaultValue: []
  })

  return (
    <h4>
      <strong>
        {products.length > 0 && products?.reduce((acc, val) => {
          const itemsPrice = val.quantity * val.price
          if (!itemsPrice) {
            return acc
          }
          return acc + itemsPrice
        }, 0)}
      </strong>
    </h4>
  )
}

export const ProductItem = ({ control, register, errors, index, remove, item }) => {
  const products = useWatch({
    control,
    name: 'products',
    defaultValue: []
  })

  // console.log(`products${index}`, products)

  const product = products?.length > 0 && products[index]
  const productsUnit = products.map(i => i.unit)
  const units = productsItem
    .find(item => item.product_name === product.product_name)?.units

  const filtered = units?.filter(unit => !productsUnit.includes(unit.name))
  const price = units?.find(item => item.name === product.unit)?.price || 0

  // console.log('productsUnit', productsUnit)
  // console.log('filtered', filtered)
  return (
    <>
      <button
        type="button"
        onClick={() => remove(index)}
        className="delete"
      >
        <img src={minusIcon} alt="delete" />
      </button>
      <div className="form-row">
        <div className="form-group col-md-7">
          <label htmlFor="product">
            Product
            <span className="text-danger">*</span>
          </label>
          <select
            id="product"
            className="form-control"
            name={`products[${index}].product_name`}
            defaultValue={item.product_name}
            ref={register({ required: true })}
          >
            <option value="" disabled>Product Name</option>
            {
              productsItem.map(product => (
                <option
                  key={product.product_name}
                  value={product.product_name}
                >
                  {product.product_name}
                </option>
              ))
            }
          </select>
          {errors.product && <span className="text-danger">Required</span>}
        </div>
        <div className="form-group col-md-3">
          <label htmlFor="unit">
            Unit
                <span className="text-danger">*</span>
          </label>
          <select
            id="unit"
            className="form-control"
            name={`products[${index}].unit`}
            defaultValue={item.unit}
            ref={register({ required: true })}
          >
            {
              !product?.product_name ? (
                <option value="" disabled>No Data Available</option>
              ) : (
                  units?.map(unit => (
                    <option
                      key={unit.name}
                      value={unit.name}
                    >
                      {unit.name}
                    </option>
                  ))
                )
            }
          </select>
          {errors.products?.length > 0 && errors.products[index]?.unit && <span className="text-danger">Required</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col">
          <label htmlFor="quantity">
            Quantity
            <span className="text-danger">*</span>
          </label>
          <input
            id="quantity"
            className="form-control"
            type="number"
            placeholder="0"
            name={`products[${index}].quantity`}
            defaultValue={item.quantity}
            ref={register({
              required: true,
              validate: {
                positive: value => parseInt(value) > 0
              },
              pattern: /\d+/
            })}
          />
          {
            errors.products?.length > 0 &&
            errors.products[index]?.quantity?.type === "required" &&
            <span className="text-danger">Required</span>
          }
          {
            errors.products?.length > 0 &&
            errors.products[index]?.quantity?.type === "positive" &&
            <span className="text-danger">Quantity must be &gt; 0</span>
          }
        </div>
        <Input
          id="price"
          label="Price"
          type="number"
          placeholder="0"
          name={`products[${index}].price`}
          register={register({
            required: true,
            validate: {
              positive: value => parseInt(value) > 0
            }
          })}
          defaultValue={item.price}
          value={price}
          error={errors.products}
          index={index}
        />
        <div className="form-group col-5 text-right">
          <label htmlFor="price">Total Price</label>
          <input
            id="price"
            type="number"
            className="form-control text-right"
            placeholder={(() => {
              if (products.length > 0 && products[index]) {
                const quantity = products[index] && products[index].quantity
                const price = products[index] && products[index].price
                if (!quantity && !price) {
                  return 0
                }
                return quantity * price
              }
            })()}
            readOnly
          />
        </div>
      </div>
      <div className="row">
        <div className="col-5 ml-auto">
          <hr />
          <div className="row justify-content-between">
            <div className="col">
              <strong>Total Nett Price</strong>
            </div>
            <div className="col text-right">
              <strong>
                {(() => {
                  if (products.length > 0 && products[index]) {
                    const quantity = products[index] && products[index].quantity
                    const price = products[index] && products[index].price
                    if (!quantity && !price) {
                      return 0
                    }
                    return quantity * price
                  }
                })()}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
