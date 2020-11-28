import { useForm } from "react-hook-form";
import useFetch from './hooks/useFetch'
import FieldArray from './components/fieldArray'
import { SelectDistribution, SelectPaymentType, TotalPrice } from "./components/Input";
import { useState } from "react";

const defaultValues = {
  name: '',
  distribution: '',
  products: [
    {
      product_name: "",
      units: [
        { name: "", price: 0 }
      ]
    },
  ]
}

export default function Form() {
  const [result, setResult] = useState(null)
  const {
    register,
    handleSubmit,
    formState,
    getValues,
    errors,
    control,
    reset,
    setValue
  } = useForm({
    defaultValues,
    mode: 'onTouched'
  });
  const { data } = useFetch('http://dummy.restapiexample.com/api/v1/employees')
  // const { data } = useFetch('https://jsonplaceholder.typicode.com/users')
  const onSubmit = data => setResult(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-3">
          <h5>
            <strong>Detail</strong>
          </h5>
        </div>
        <div className="col-9">
          <div className="form-row">
            <div className="form-group col-md-8">
              <label htmlFor="name">
                Name
                <span className="text-danger">*</span>
              </label>
              <select
                id="name"
                className="form-control"
                name="name"
                placeholder="Name"
                defaultValue=""
                ref={register({ required: true })}
              >
                <option value="" disabled>Name</option>
                {
                  data?.data?.map(user => (
                    <option key={user.id} value={user.employee_name}>{user.employee_name}</option>
                  ))
                }
              </select>
              {errors.name && <span className="text-danger">Required</span>}
            </div>
            <div className="form-group col-md-6">
              <SelectDistribution
                control={control}
                errors={errors}
                register={register}
              />
            </div>
          </div>
          <SelectPaymentType
            control={control}
            errors={errors}
            register={register}
          />
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-3">
          <h5>
            <strong>Products</strong>
          </h5>
        </div>
        <div className="col-9">

          <FieldArray
            {...{ control, register, getValues, defaultValues, setValue, errors }}
          />

          <div className="row">
            <div className="col-5 ml-auto">
              <hr />
              <div className="row justify-content-between">
                <div className="col">
                  <h4>
                    <strong>Total</strong>
                  </h4>
                </div>
                <div className="col text-right">
                  <TotalPrice control={control} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="text-right">
        <button
          type="submit"
          className="btn"
        >
          Submit
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => console.log('formState', formState)}
        >
          CANCEL
        </button>
        <button
          type="submit"
          className={`btn ${!formState.isValid ? 'btn-secondary' : 'btn-success'}`}
          disabled={!formState.isValid}
        >
          CONFIRM
        </button>
      </div>

      <hr />
      <pre>
        {result && JSON.stringify(result, null, 2)}
      </pre>
    </form>
  )
}
