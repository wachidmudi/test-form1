import { useFieldArray, useWatch } from "react-hook-form";
import { ProductItem } from "./Input";
import plusIcon from '../assets/icon_plus.svg'

// let renderCount = 0;

export default function Fields({ control, register, setValue, getValues, errors }) {
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products"
  });

  // renderCount++;

  return (
    <>
      {
        name && distribution && (
          <>
            {fields.map((item, index) => {
              return (
                <div className="product-item" key={index}>
                  <ProductItem
                    control={control}
                    register={register}
                    errors={errors}
                    index={index}
                    remove={remove}
                    item={item}
                  />
                </div>
              );
            })}

            <section>
              <button
                type="button"
                className="btn btn-warning text-white"
                onClick={() => {
                  append({
                    product_name: "",
                    units: [
                      { name: "", price: 0 },
                      { name: "", price: 0 }
                    ]
                  });
                }}
              >
                <strong>NEW ITEM <img src={plusIcon} alt="add" width="20" /></strong>
              </button>
            </section>
          </>
        )
      }

      {/* <span className="counter">Render Count: {renderCount}</span> */}
    </>
  );
}
