"use client"
import { checkUserSubscription } from '@/actions/userActions'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function MealPlan() {
  const user = useUser();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    const checkSubscription = async () => {
      if (user.isLoaded && user.isSignedIn) {
        const res = await checkUserSubscription(user.user.id)
        if (res && res.subscriptionExpiryDate) {
          if (new Date(res.subscriptionExpiryDate) > new Date()) {
            setIsSubscribed(true);
          }
        }
        setIsFetching(false);
      }
    }
    checkSubscription()
  }, [user.isLoaded, user.isSignedIn])
  return (
    <div>
      {
        (!isSubscribed && !isFetching) && (
          <div className='bg-stone-900/70 fixed inset-0'>
            <h3 className='text-3xl'>You need a subscription to continue</h3>
            <Link href={"/subscribe"}>
              <Button>View Plans</Button>
            </Link>
            <Link href={"/"}>
              <Button>Home</Button>
            </Link>
          </div>
        )
      }
      <div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, quod fugit. Beatae quia saepe suscipit. Fugit quae, et, amet inventore magni quos ipsum provident reprehenderit magnam error alias nemo quas! Tenetur quibusdam et error consequuntur iste eum, earum alias fugit exercitationem! Pariatur ratione suscipit corporis dolorem laudantium iusto fugiat possimus nobis ut, animi voluptates vero. Magnam dolorem perferendis inventore expedita aspernatur incidunt doloremque numquam repellendus at quia nulla distinctio, sunt consequatur nisi, exercitationem earum. Temporibus ipsam quo repellendus voluptatem soluta cum recusandae quos corporis aut modi unde laborum maxime facilis, aspernatur sit adipisci corrupti perferendis qui! Nulla aut repellendus ducimus, vitae modi excepturi soluta quibusdam atque ratione velit illum consequuntur distinctio ad porro sunt. Sint nam omnis ea nisi corporis aliquid, adipisci natus a eligendi illum? Cum ab recusandae nam, expedita officia eum soluta libero illo praesentium fugiat quae beatae voluptatibus amet facere dolores asperiores iure aliquid deserunt, nostrum aspernatur veritatis quam quidem accusamus error. Perspiciatis dolorum molestias enim mollitia ab, dolore cum neque non quisquam blanditiis nostrum quasi accusamus soluta sequi consectetur deserunt aliquid delectus in minima dolorem? Reiciendis nesciunt inventore, eligendi est neque minus sint accusamus corporis repudiandae rem optio quia repellendus cumque, dolorum quibusdam praesentium quaerat necessitatibus tenetur facere explicabo ipsa placeat at consequatur? Totam a praesentium doloribus error unde ut, laudantium esse porro, nesciunt blanditiis laborum ullam sunt necessitatibus. Porro quas, esse exercitationem id quaerat voluptatum doloribus voluptates commodi corporis eligendi labore aliquam. Nobis aliquam laboriosam error excepturi eius suscipit tempore odit sapiente debitis ullam, iure sit omnis placeat ipsa exercitationem asperiores minus ex necessitatibus eaque corrupti! Animi iure soluta rerum iusto est vel itaque inventore odio aliquid natus molestiae, consectetur tenetur, dicta cumque ut accusantium, minima quis. Similique cum tenetur mollitia impedit nisi temporibus vel in blanditiis sit voluptates necessitatibus molestiae aliquam cumque odio quod, fuga reiciendis esse laudantium expedita repellendus error quas deleniti! Alias nemo officiis voluptatum facere. Laboriosam dolorum cumque temporibus quo inventore adipisci fugit illo nesciunt. Labore perspiciatis quas quia, iusto culpa tempore qui corporis hic laudantium aliquam sapiente rem aut illum adipisci maxime quibusdam nostrum consequuntur, esse voluptatum, maiores quis provident nesciunt? Ullam eos, facilis necessitatibus consequuntur eveniet deleniti quisquam temporibus ipsum! Libero, quo animi repudiandae deserunt quod commodi facilis adipisci blanditiis molestias dolor laboriosam assumenda voluptates recusandae dicta omnis non qui, deleniti minus ipsam harum. Nihil, eius tempore. Expedita veniam molestiae praesentium assumenda officia quo ipsum enim id esse commodi reiciendis, doloribus nostrum repellendus eligendi deserunt, aliquid fugiat adipisci perspiciatis quisquam illum asperiores laudantium exercitationem. Dolores aut ullam maxime ex reprehenderit omnis error ea recusandae quasi reiciendis? Reiciendis, rem aperiam quae cum ipsa nam tenetur aspernatur saepe sequi, quis sed explicabo repellendus ipsam veniam dolorem excepturi omnis optio nihil obcaecati doloremque magnam? Sint veniam eum repudiandae sunt tempore, aspernatur vitae temporibus unde, saepe nam sapiente excepturi voluptas accusamus consectetur dolor at et! Eveniet itaque hic inventore laboriosam minus excepturi consequatur saepe sed obcaecati omnis dolor beatae, ea sequi reprehenderit animi natus mollitia dicta expedita aliquid architecto at, illum laudantium quae. Cupiditate assumenda soluta enim hic veniam necessitatibus, quas vitae doloribus iusto dolorum adipisci voluptatibus quidem exercitationem eveniet dolorem harum corporis inventore provident distinctio corrupti, porro odio ea optio iure. Hic pariatur reiciendis eaque necessitatibus magnam maiores debitis, unde distinctio aliquam. Nulla magnam quam dicta, aspernatur error amet voluptatibus obcaecati ut voluptate, sint corporis excepturi nisi in commodi ab repellat. Odit iste itaque nihil ea necessitatibus cupiditate impedit sint quasi quaerat molestias! Eius, delectus atque harum possimus veniam voluptatibus reprehenderit ratione odio consequatur cum quis! Esse velit iure rem cumque aliquid porro quam debitis perspiciatis laborum. Animi sed quasi incidunt? Accusamus, dolorum? Obcaecati dignissimos quam odit voluptatum, sit fuga quo vitae doloribus doloremque id quod saepe minus eos, debitis provident recusandae distinctio, blanditiis ducimus! Laudantium dolores modi minus quidem inventore facere id illum est optio, commodi molestiae impedit velit tempore! Rerum commodi voluptates quod atque iste! Beatae, molestiae libero? Voluptate provident nihil corporis corrupti sunt, labore, exercitationem nemo, officia facilis non excepturi eligendi aperiam? Deserunt molestiae placeat recusandae eaque similique, vel facere, dicta minima explicabo qui aliquam tempore harum facilis ad. Eveniet, quos. Error a, eligendi qui consequuntur cupiditate possimus ipsum optio molestias laboriosam rerum. Et, aspernatur nesciunt. Necessitatibus quia debitis obcaecati rerum sed reiciendis sint magni ratione nobis dolorum. Ducimus, accusantium! Eos error ad neque quaerat ut molestias, ratione eum! Recusandae enim quam modi labore blanditiis veniam doloribus eum nostrum non consequatur temporibus corporis, odit neque dolorem inventore facilis magnam quaerat, suscipit unde! Atque vitae quaerat hic beatae earum sit, voluptatem dolores recusandae ex itaque laboriosam, dolorem obcaecati alias quo! Voluptatem nam blanditiis quisquam perferendis dolore sit velit deleniti vitae, hic modi odio officiis voluptatibus esse a. Enim eligendi neque quisquam sit, praesentium sint iusto, incidunt est voluptates eveniet odit quasi sequi fugiat! Assumenda odit voluptatibus rerum at beatae distinctio quidem illo molestias accusamus in incidunt mollitia libero, ex officia. Aliquid est quidem obcaecati tempora dolore, ullam ea animi repellendus quaerat suscipit illo recusandae tempore nam possimus nesciunt maiores ipsa quae numquam natus id excepturi voluptatem ut harum quis? Rem iure modi quidem dolor sint tempora consectetur iste. Reiciendis commodi accusantium ut ex dolor eius qui illo rem praesentium et vitae rerum quisquam, dolore corrupti quos molestiae totam eaque sapiente repellat vel dignissimos. Assumenda ipsum temporibus et ex provident unde aut ducimus sunt. Illum deserunt eos quibusdam molestiae sint molestias accusamus labore eaque earum facilis, obcaecati, praesentium nihil iure sed saepe sapiente porro? Necessitatibus a distinctio nihil consectetur expedita, molestias totam ipsa reprehenderit sequi inventore explicabo optio recusandae quibusdam. Eligendi, laudantium. Quis, assumenda recusandae obcaecati perspiciatis fuga ipsa, ab rem dolorem iure quae harum amet! Nostrum neque corrupti necessitatibus! Esse hic deserunt debitis sapiente omnis cumque officia eius iste? Itaque neque velit ipsam magni iure sunt voluptatum fugiat officiis, nostrum illo blanditiis quidem harum hic voluptas minus reiciendis architecto qui tempore laboriosam dolorum ullam, totam ipsum doloremque! Quo iusto unde fuga minima voluptatibus facilis, illum amet similique? Adipisci blanditiis provident neque nesciunt accusamus ullam vitae, dignissimos qui, facilis placeat repellat.
      </div>
    </div>
  )
}

export default MealPlan
