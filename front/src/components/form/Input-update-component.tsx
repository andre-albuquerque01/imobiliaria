interface InputProps {
  type: string
  label: string
  id: string
  name: string
  required: boolean
  value: string | number
}

export const InputUpdateComponent = ({ ...props }: InputProps) => {
  return (
    <div className="flex flex-col text-black">
      <label htmlFor={props.id}>
        {props.label}
        {props.required && <span className="text-xs text-red-600"> *</span>}
      </label>
      <input
        type={props.type}
        name={props.name}
        id={props.id}
        className="bg-transparent border border-zinc-400 p-1.5 outline-none text-black rounded-lg w-full"
        required={props.required}
        defaultValue={props.value}
        step={0.01}
      />
    </div>
  )
}
