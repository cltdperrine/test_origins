// fallback si une des sections n'est pas supportée ou reconnue

export default function SectionFallback() {
    return (
        <div className="p-6 bg-red-600 text-white font-bold">
            Section not supported
        </div>
    )
}